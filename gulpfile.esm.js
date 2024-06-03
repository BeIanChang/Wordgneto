import { src, dest } from 'gulp'; // 引入 gulp 的 src 和 dest 方法
import through from 'through2'; // 引入 through2 模块，用于创建转换流
import * as XLSX from 'xlsx'; // 引入 xlsx 模块，用于处理 Excel 文件
import * as path from 'path'; // 引入 path 模块，用于处理文件路径

// 定义一个函数，将 Excel 转换为 JSON
function excel2json() {
  let json = {};
  const stream = through.obj(function(file, encode, cb) {
    if (!file.isBuffer()) {
      return cb(null, file); // 如果文件不是 Buffer 对象，则直接返回
    }
    const workbook = XLSX.read(file.contents); // 读取 Excel 文件内容
    const excelData = XLSX.utils.sheet_to_json(workbook.Sheets['Sheet1']); // 将 Excel 数据转换为 JSON 对象
    json = excelData.reduce((result, current) => {
      let newCurrent = {};
      for (var key in current) {
        var letterPattern = /[a-zA-Z]+/g;
        var matches = key.match(letterPattern);
        if (matches) {
          var string = matches[0].toLocaleLowerCase();
          newCurrent[string] = current[key].replace(/@{/g, '{');
        }
      }
      result[newCurrent.key] = {};
      result[newCurrent.key]['en'] = newCurrent.en || '';
      result[newCurrent.key]['zh'] = newCurrent.zh || '';
      result[newCurrent.key]['id'] = newCurrent.id || '';
      result[newCurrent.key]['tw'] = newCurrent.tw || '';
      result[newCurrent.key]['th'] = newCurrent.th || '';
      result[newCurrent.key]['ru'] = newCurrent.ru || '';
      result[newCurrent.key]['vi'] = newCurrent.vi || '';
      result[newCurrent.key]['es'] = newCurrent.es || '';
      result[newCurrent.key]['pt'] = newCurrent.pt || '';

      result[newCurrent.key]['ja'] = newCurrent.ja || '';
      result[newCurrent.key]['uk'] = newCurrent.uk || '';
      result[newCurrent.key]['ko'] = newCurrent.ko || '';
      result[newCurrent.key]['de'] = newCurrent.de || '';
      result[newCurrent.key]['fr'] = newCurrent.fr || '';
      return result;
    }, json);
    file.contents = Buffer.from(JSON.stringify(json, null, '\t')); // 将 JSON 对象转换为 Buffer
    file.path = path.join(file.base, 'i18n.json'); // 设置输出文件路径
    cb(null, file); // 处理完成，回调返回文件
  });

  return stream;
}

// 将翻译好的 Excel 写入 JSON 文件
function i18nwrite() {
  return src(['./src/locales/i18n.xlsx']) // 读取指定路径的 Excel 文件
    .pipe(excel2json()) // 转换为 JSON
    .pipe(dest('src/locales')); // 输出到指定路径
}

export { i18nwrite }; // 导出 i18nwrite 函数
