export class CommonUpload {
    static customFileName(req, file, cb) {
        console.log(file.originalname)
        var keep=file.originalname
        const uniqueSuffix = Math.round(Math.random() * 5);
        let fileExtension = "";
        if(file.mimetype.indexOf("jpeg") > -1){
            fileExtension = "jpg"
        }else if(file.mimetype.indexOf("png") > -1){
            fileExtension = "pdf";
        }else if(file.mimetype.indexOf("jpg") > -1){
            fileExtension = "pdf";
        }
        const originalName = file.originalname.split(".")[0];
        fileExtension=file.originalname.split(".")[1]
        cb(null, keep);
    }

    static destinationPath(req, file, cb) {
        cb(null, './assets/uploads')
    }
}