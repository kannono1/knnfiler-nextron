const WindowMode = {
    Files: 0,
    TextView: 1,
} as const;
type WindowMode = typeof WindowMode[keyof typeof WindowMode];

export default WindowMode;