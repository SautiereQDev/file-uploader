# 🖼️ File Uploader

Nodejs server to upload files on a cdn, entirely  made with Typescript.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

#### Define environement variables

- `PORT` : Port on which the server will run
- `UPLOAD_PATH` : Path where images will be stored

## Routes
- `POST /files-uploader` : Upload a file on the server
- `GET /files-uploader` : Get informations about api

### Installation

1. Clone the repository: [Repo](https://github.com/SautiereQDev/image-uploader)
2. Install dependencies: `npm install` or `yarn install`
3. Run the project on dev mode `start:dev`

## Files depositoring
1. make a request on `POST /files-uploader/upload` on `multipart/form-data` body with a `file` field and `path`filed

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

## Logging System

The application includes a comprehensive logging system that tracks all server interactions:

### Log Types
- HTTP request logs: Records all incoming HTTP requests
- Application logs: Tracks application activities and errors
- File upload logs: Detailed information about file uploads

### Log Files
- `logs/combined.log`: Contains all log entries
- `logs/error.log`: Contains only error-level logs

### Log Levels
- `error`: Critical errors requiring immediate attention
- `warn`: Warnings that should be addressed
- `info`: General information about application operation
- `debug`: Detailed debugging information (dev mode only)

### Environment Variables
- `NODE_ENV=production`: Sets logging to production mode (less verbose)

## License
This project is licensed under the Apache 2.0 License - see the [LICENSE](LICENSE) file for details

## Author
- **Quentin Sautière** [@SautiereQDev](https://github.com/SautiereQDev)