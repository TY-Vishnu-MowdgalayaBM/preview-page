import React, { useRef, useState } from 'react'
import { Modal } from 'react-bootstrap';
import FileViewer from 'react-file-viewer'


const Preview: React.FC = () => {

    const [file, setFile] = useState('');

    const [type, setType] = useState('');

    const [toggle, setToggle] = useState(false);

    const [show, setShow] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);

    const getPreview = () => {

        var data: FileList | null = inputRef.current ? inputRef.current.files : null;
        // console.log(inputRef);
        setFile(data ? URL.createObjectURL(data[0]) : "");

        var fileurl = data ? data[0].type : ""
        setShow(true);
        if (fileurl.includes("mp4")) {
            setType("mp4")
        } else if (fileurl.includes("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")) {
            setType("xlsx");
        } else if (fileurl.includes("openxmlformats-officedocument.wordprocessingml.document")) {
            setType("docx");
        } else if (fileurl.includes("megep")) {
            setType("mp3");
        } else if (fileurl.includes("jpeg")) {
            setType("jpeg");
        } else {
            setType(fileurl.split("/")[1])
        }

        setToggle(!toggle);

    }

    // const file = "./Case-Study-Shell.pdf";
    // const type = "pdf";
    // const props = {
    //     allowFullScreen: true,
    //     src: "http://projects.itsasbreuk.nl/react-components/itsa-docviewer/example.pdf"
    // };
    // const onError = (e: any) => {
    //     console.log(e, "error in file-viewer");
    // };
    return (
        <div>
            <input type="file" id="myfile" name="myfile" ref={inputRef} ></input>
            <input type="submit" onClick={getPreview} value='preview'></input>
            {/* {toggle && <FileViewer fileType={type} filePath={file} />} */}
            {/* <Modal
                show={show}
                onHide={() => setShow(false)}
                dialogClassName="modal-90w"
                aria-labelledby="contained-modal-title-vcenter"

            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Preview Page
          </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{
                    maxHeight: 'calc(100vh - 210px)',
                    overflowY: 'auto',
                }}>
                    <FileViewer fileType={type} filePath={file} />
                </Modal.Body>
            </Modal> */}

            <Modal
                size="lg"
                show={show}
                onHide={() => setShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Preview
          </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FileViewer fileType={type} filePath={file} />


                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Preview
