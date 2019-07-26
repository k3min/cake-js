var BlendFunction;
(function (BlendFunction) {
    BlendFunction[BlendFunction["Zero"] = 0] = "Zero";
    BlendFunction[BlendFunction["One"] = 1] = "One";
    BlendFunction[BlendFunction["SrcColor"] = 768] = "SrcColor";
    BlendFunction[BlendFunction["OneMinusSrcColor"] = 769] = "OneMinusSrcColor";
    BlendFunction[BlendFunction["SrcAlpha"] = 770] = "SrcAlpha";
    BlendFunction[BlendFunction["OneMinusSrcAlpha"] = 771] = "OneMinusSrcAlpha";
    BlendFunction[BlendFunction["DstAlpha"] = 772] = "DstAlpha";
    BlendFunction[BlendFunction["OneMinusDstAlpha"] = 773] = "OneMinusDstAlpha";
    BlendFunction[BlendFunction["DstColor"] = 774] = "DstColor";
    BlendFunction[BlendFunction["OneMinusDstColor"] = 775] = "OneMinusDstColor";
    BlendFunction[BlendFunction["SrcAlphaSaturate"] = 776] = "SrcAlphaSaturate";
})(BlendFunction || (BlendFunction = {}));
export default BlendFunction;
