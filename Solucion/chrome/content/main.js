(function() {
  var File;
  File = (function() {
    var doc;
    function File() {}
    doc = null;
    File.prototype.open = function() {
      var data, fp, nsIFilePicker, res, thefile;
      nsIFilePicker = Components.interfaces.nsIFilePicker;
      fp = Components.classes["@mozilla.org/filepicker;1"].createInstance(nsIFilePicker);
      fp.init(window, "Open File", nsIFilePicker.modeOpen);
      fp.appendFilters(nsIFilePicker.filterText | nsIFilePicker.filterAll);
      res = fp.show();
      if (res === nsIFilePicker.returnOK) {
        thefile = fp.file;
        data = this.read(thefile.path);
        return this.graficar(data);
      }
    };
    File.prototype.read = function(filename) {
      var file, inputStream, nsIFileInputStream, nsILocalFile, nsIScriptableInputStream, output, sInputStream;
      nsILocalFile = Components.interfaces.nsILocalFile;
      file = Components.classes["@mozilla.org/file/local;1"].createInstance(nsILocalFile);
      file.initWithPath(filename);
      if (file.exists() === false) {
        alert("File does not exist");
      }
      nsIFileInputStream = Components.interfaces.nsIFileInputStream;
      inputStream = Components.classes["@mozilla.org/network/file-input-stream;1"].createInstance(nsIFileInputStream);
      inputStream.init(file, 0x01, 00004, null);
      nsIScriptableInputStream = Components.interfaces.nsIScriptableInputStream;
      sInputStream = Components.classes["@mozilla.org/scriptableinputstream;1"].createInstance(nsIScriptableInputStream);
      sInputStream.init(inputStream);
      output = sInputStream.read(sInputStream.available());
      return output;
    };
    File.prototype.save = function() {
      var fp, nsIFilePicker, res, thefile;
      nsIFilePicker = Components.interfaces.nsIFilePicker;
      fp = Components.classes["@mozilla.org/filepicker;1"].createInstance(nsIFilePicker);
      fp.init(window, "Save File", nsIFilePicker.modeSave);
      fp.appendFilters(nsIFilePicker.filterText | nsIFilePicker.filterAll);
      res = fp.show();
      if (res === nsIFilePicker.returnOK) {
        thefile = fp.file;
        return this.write(thefile.path, this.xml2string(this.doc));
      }
    };
    File.prototype.write = function(filename, data) {
      var file, nsIFileOutputStream, nsILocalFile, outputStream;
      nsILocalFile = Components.interfaces.nsILocalFile(file = Components.classes["@mozilla.org/file/local;1"].createInstance(nsILocalFile));
      nsIFileOutputStream = Components.interfaces.nsIFileOutputStream;
      outputStream = Components.classes["@mozilla.org/network/file-output-stream;1"].createInstance(nsIFileOutputStream);
      file.initWithPath(filename);
      outputStream.init(file, 0x04 | 0x08 | 0x20, 0666, 0);
      outputStream.write(data, data.length);
      return outputStream.close();
    };
    File.prototype.graficar = function(data) {
      var array, field, fieldy, fieldz, gData, i, parse, _ref;
      parse = new DOMParser();
      this.doc = parse.parseFromString(data, "application/xml");
      array = new Array();
      array = d3.select(this.doc).selectAll("Bar")[0];
      gData = new Array();
      for (i = 0, _ref = array.length - 1; 0 <= _ref ? i <= _ref : i >= _ref; 0 <= _ref ? i++ : i--) {
        field = parseInt(array[i].getAttribute("x"));
        fieldy = parseInt(array[i].getAttribute("y"));
        fieldz = parseInt(array[i].getAttribute("z"));
        gData.push({
          x: field,
          y: fieldy,
          z: fieldz
        });
      }
      return makeGraph(gData);
    };
    return File;
  })();
  this.file = new File;
}).call(this);
