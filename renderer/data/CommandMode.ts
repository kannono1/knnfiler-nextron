const CommandMode = {
    None: 0,
    MakeDirectory: 1,
    Delete: 2,
} as const;
type CommandMode = typeof CommandMode[keyof typeof CommandMode];

export default CommandMode;
