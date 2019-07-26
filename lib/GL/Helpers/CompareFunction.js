var CompareFunction;
(function (CompareFunction) {
    CompareFunction[CompareFunction["Never"] = 512] = "Never";
    CompareFunction[CompareFunction["Less"] = 513] = "Less";
    CompareFunction[CompareFunction["Equal"] = 514] = "Equal";
    CompareFunction[CompareFunction["LessEqual"] = 515] = "LessEqual";
    CompareFunction[CompareFunction["Greater"] = 516] = "Greater";
    CompareFunction[CompareFunction["NotEqual"] = 517] = "NotEqual";
    CompareFunction[CompareFunction["GreaterEqual"] = 518] = "GreaterEqual";
    CompareFunction[CompareFunction["Always"] = 519] = "Always";
})(CompareFunction || (CompareFunction = {}));
export default CompareFunction;
