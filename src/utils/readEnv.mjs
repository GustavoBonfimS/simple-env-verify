import LineByLine from "line-by-line";

function readEnv(filePath) {
  return new Promise((resolve, reject) => {
    const lr = new LineByLine(filePath);

    const envObj = {};

    lr.on("line", (line) => {
      const [key, value] = line.split("=");
      envObj[key] = value;
    });

    lr.on("end", () => {
      resolve(envObj);
    });

    lr.on("error", (err) => {
      reject(err);
    });
  });
}

export default readEnv;
