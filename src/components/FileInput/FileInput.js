import React, { Component } from 'react'

const ENDPOINT = 'https://ry49fxxl4l.execute-api.us-east-1.amazonaws.com/dev/file/upload'

class FileInput extends Component {
    constructor(props) {
        super(props)
        this.uploadImage = this.uploadImage.bind(this);
        this.fileInput = React.createRef();
    }

    uploadImage = (event) => {
        event.preventDefault();

        // const reader = new FileReader()
        // reader.onloadend = () => {
        //     // Use a regex to remove data url part
        //     const base64String = reader.result
        //         .replace('data:', '')
        //         .replace(/^.+,/, '');
        //     console.log(base64String)
        // }

        const file = this.fileInput.current.files[0]
        const formData = new FormData()

        formData.append('file', file)

        if (!file) {
            return alert('Please upload a file first')
        }

        if (!this.validateFileExtension('image')) {
            return alert('Invalid file extension - only .jpg, .jpeg, .png, .gif, .bmp and .webp files accepted')
        } else {
            console.log('Uploading image', )
            return fetch(`${ENDPOINT}?userId=${this.props.userId}`, {
                method: 'post',
                // headers: {
                //     'Content-Type': 'multipart/form-data',
                // },
                // body: reader.readAsDataURL(file)
                body: formData
            })
            .then(resp => resp.json())
            .then(data => {
                if (data.link) {
                    return this.props.updateImage()
                } else {
                    return alert('Update failed - please try again')
                }
            })
            .catch(error => console.log(`Something went wrong! ${error}`))
        }    
    }

    validateFileExtension = (filetype) => {
        
        const performCheck = (allowedFiles) => {
            const regex = RegExp("([a-zA-Z0-9\s_\\.\-:])+(" + allowedFiles.join('|') + ")$");
            const filename = this.fileInput.current.files[0].name
            if (!regex.test(filename.toLowerCase())) {
                return false
            } else {
                return true
            }
        }

        const allowedImageFiles = [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp"]
        const allowedVideoFiles = [".mp4", ".ogg", ".webm"]
        const allowedDocumentFiles = ['.pdf', '.doc', '.docx']

        const result = () => {
            switch (filetype) {
                case 'image':
                    return performCheck(allowedImageFiles)
                case 'video':
                    return performCheck(allowedVideoFiles)
                case 'document':
                    return performCheck(allowedDocumentFiles)
                default:
                    console.error('FileValidationError: unrecognised file type')
                    return false
            }
        }
        return result()
    }

    render() {
        return (
            <div class="fileupload">
                <h2>Update Picture</h2>
                <form id="form" enctype="multipart/form-data">
                    <div class="input-group">
                        <label for="file">Select file</label>
                        <input id="file" ref={this.fileInput} type="file" />
                    </div>
                    <button class="submit-btn" onClick={this.uploadImage}>Upload</button>
                </form>
            </div>
        )
    }
}

export default FileInput