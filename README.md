# 🖼️ File Uploader

Nodejs server to upload files on a cdn, entirely  made with Typescript.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

#### Define environement variables

- `PORT` : Port on which the server will run
- `UPLOAD_PATH` : Path where images will be stored

### Installation

1. Clone the repository: [Repo](https://github.com/SautiereQDev/image-uploader)
2. Install dependencies: `npm install` or `yarn install`
3. Run the project on dev mode `start:dev`

## Files depositoring
1. make a request on `POST /upload` on `multipart/form-data` body with a `file` field and `path`filed

2. The server return a json with the current structure : 
```json
{
    "message": "Fichier uploadé avec succès !",
    "data": {
        "path": "<requested path>/fileName",
        "filename": "<fileName>.<file extension>",
        "size": "<file size>"
    }
}
```
in case of success and an erorr message in case of failure.	

## Built With

- [NodeJs](https://nodejs.org/en)
- [Typescript](https://www.typescriptlang.org/)
- [Expressjs](https://expressjs.com/fr/)
- [Multer](https://github.com/expressjs/multer)

## License
This project is licensed under the Apache 2.0 License - see the [LICENSE.md](LICENSE.md) file for details

## Author
- **Quentin Sautière** [@SautiereQDev](https://github.com/SautiereQDev)