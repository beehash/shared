import { link } from "fs";

const path = location.path;
const head = document.getElementsByTagName('head')[0];

export function requireModule (cssList, jsList, cb) {
  const promiseList = cssList.map((item) => {
    const linktag = ducument.createElement('link');
    linktag.href=path+item;
    head.appendChild(linktag);
  });
}
