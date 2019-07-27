var StencilFunction;
(function (StencilFunction) {
    StencilFunction[StencilFunction["Keep"] = 7680] = "Keep";
    StencilFunction[StencilFunction["Zero"] = 0] = "Zero";
    StencilFunction[StencilFunction["Replace"] = 7681] = "Replace";
    StencilFunction[StencilFunction["Increment"] = 7682] = "Increment";
    StencilFunction[StencilFunction["IncrementWrap"] = 34055] = "IncrementWrap";
    StencilFunction[StencilFunction["Decrement"] = 7683] = "Decrement";
    StencilFunction[StencilFunction["DecrementWrap"] = 34056] = "DecrementWrap";
    StencilFunction[StencilFunction["Invert"] = 5386] = "Invert"; // GL_INVERT
})(StencilFunction || (StencilFunction = {}));
export default StencilFunction;
