import multer from "multer";

const storage=multer.memoryStorage();
/*creates a storage engine;
keeps uploaded files in RAM.
to process files immediately
*/

const upload=multer({storage:storage})
/* initialize multer with storage engine
upload >>used as middleware in routes
 */

export default upload;