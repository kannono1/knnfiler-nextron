import React from "react";

type Props = {
    wid: number;
}

const FileList:React.FC<Props> = ({wid}) => {
    return <p>FileListView{wid}</p>;
}

export default FileList;
