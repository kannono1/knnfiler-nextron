import React from "react";

type Props = {
    wid: number;
}

const style: React.CSSProperties = {
    width: '50%',
};

const CurrentDir: React.FC<Props> = ({ wid }) => {
    return <div>CurrentDir{wid}</div>;
};

export default CurrentDir;

