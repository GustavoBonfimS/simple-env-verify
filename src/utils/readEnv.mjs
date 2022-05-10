import lineByLine from "line-by-line";

function readEnv(filePath) {
  return new Promise((resolve, reject) => {
    const lr = new lineByLine(filePath);

    const env_obj = {};

    lr.on("line", (line) => {
      const [key, value] = line.split("=");
      env_obj[key] = value;
    });

    lr.on("end", () => {
      resolve(env_obj);
    });

    lr.on("error", (err) => {
      reject(err);
    });
  });
}

export default readEnv;
