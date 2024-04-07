import React, {useState} from 'react';
import Modal from 'react-bootstrap/Modal';

const AddBookModal = ({close, show, setShow}) => {
    const [file, setFile] = useState(null)
    const [formData, setFormData] = useState({})
    const onChangeHandleFile = (e) => {
        setFile(e.target.files[0])
    }

    const onChangeHandleInput = (e) => {
        const {name, value} = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const uploadFile = async () => {
        const fileData = new FormData();
        fileData.append('uploadImg', file)

        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/books/cloudUploadImg`, {
                method: 'POST',
                body: fileData
            })
            return await response.json()
        } catch (e) {
            console.log(e.message)
        }
    }

    const submitBook = async (e) => {
        e.preventDefault();
        if (file) {
            try {
                const uploadedFile = await uploadFile(file)
                const bodyToSend = {
                    ...formData,
                    cover: uploadedFile.source
                }
                const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/books/create`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(bodyToSend)
                })
                return await response.json()
            } catch (e) {
                console.log(e.message)
            }
        }
    }

    return (
        <Modal
            show={show}
        >
            <Modal.Header
                onClick={() => close()}
                closeButton
            >
                <Modal.Title>
                    Modal title
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <form
                    encType="multipart/form-data"
                    className="d-flex flex-column gap-3"
                    onSubmit={submitBook}
                >
                    <input
                        onChange={onChangeHandleInput}
                        className="form-control"
                        name="author"
                        type="text"
                        placeholder="inserisci autore"
                    />
                    <input
                        onChange={onChangeHandleInput}
                        name="title"
                        className="form-control"
                        type="text"
                        placeholder="inserisci titolo"
                    />
                    <input
                        onChange={onChangeHandleInput}
                        name="editor"
                        className="form-control"
                        type="text"
                        placeholder="inserisci editore"
                    />
                    <input
                        onChange={onChangeHandleFile}
                        type="file"
                        className="form-control"
                        name="uploadImg"
                    />
                    <input
                        onChange={onChangeHandleInput}
                        type="text"
                        className="form-control"
                        name="price"
                        placeholder="inserisci prezzo"
                    />
                    <input
                        onChange={onChangeHandleInput}
                        type="text"
                        name="description"
                        className="form-control"
                        placeholder="inserisci descrizione"
                    />
                    <input
                        onChange={onChangeHandleInput}
                        type="datetime-local"
                        className="form-control"
                        name="pubDate"
                        placeholder="inserisci data"
                    />
                    <select
                        onChange={onChangeHandleInput}
                        name="isFeatured"
                        className="form-control"
                    >
                        <option selected disabled>Scegli opzione Featured</option>
                        <option value='true'>Featured</option>
                        <option value='false'>Not Featured</option>
                    </select>
                    <button
                        type="submit"
                        className="btn btn-primary pt-2"
                    >
                        Aggiungi Libro
                    </button>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default AddBookModal;
