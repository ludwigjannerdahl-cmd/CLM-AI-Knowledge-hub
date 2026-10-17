import importlib.util, json, pathlib, tempfile, unittest
ROOT=pathlib.Path(__file__).resolve().parents[2]
spec=importlib.util.spec_from_file_location("stage", ROOT/"project-brain/stage_passages.py")
mod=importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
class PassageGateTests(unittest.TestCase):
    def setUp(self):
        self.tmp=tempfile.TemporaryDirectory(); self.addCleanup(self.tmp.cleanup)
        self.root=pathlib.Path(self.tmp.name); (self.root/"src").mkdir()
        (self.root/"src/chapters.json").write_text(json.dumps({"tabs":[{"id":"one","body":"Not all missing values are negative answers."},{"id":"two","body":"Tests that have been drafted do not establish passing results."}]}))
    def test_no_approval(self):
        manifest,passages=mod.build(self.root)
        self.assertEqual(manifest["approved_claims"],0)
        self.assertEqual(len(passages),4)
        self.assertTrue(all(not p["approved"] and not p["claim_extracted"] for p in passages))
    def test_exact_source(self):
        manifest,p=mod.build(self.root)
        self.assertEqual(p[1]["source_pointer"],"/tabs/0/body")
        self.assertEqual((manifest,p),mod.build(self.root))
    def test_same_text_distinct_provenance(self):
        s="A repeated passage is a distinct authored occurrence."
        (self.root/"src/chapters.json").write_text(json.dumps({"a":s,"b":s}))
        _,p=mod.build(self.root)
        self.assertNotEqual(p[0]["id"],p[1]["id"])
        self.assertEqual(p[0]["text_sha256"],p[1]["text_sha256"])
    def test_empty_refused(self):
        (self.root/"src/chapters.json").write_text("{}")
        with self.assertRaises(ValueError):mod.build(self.root)
    def test_bad_json_refused(self):
        (self.root/"src/chapters.json").write_text("not JSON")
        with self.assertRaises(json.JSONDecodeError):mod.build(self.root)
    def test_pointer_escape(self):
        (self.root/"src/chapters.json").write_text(json.dumps({"a/b~c":"text"}))
        _,p=mod.build(self.root)
        self.assertEqual(p[0]["source_pointer"],"/a~1b~0c")
if __name__=="__main__":unittest.main()
