const worker_threads = require('worker_threads');

const genPass = (length) => {
    return new Promise((resolve, reject) => {
      const worker = new worker_threads.Worker("./worker.js", {
        workerData: length,
      });
  
      worker.on("message", resolve);
      worker.on("messageerror", reject);
    });
  };
  
  (async () => {
    const passwordBytesSize = 4;
    const password = await genPass(passwordBytesSize);
    console.log(password);
  })();
  