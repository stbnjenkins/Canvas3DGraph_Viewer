class File
  doc = null
  
  open: ->
    nsIFilePicker = Components.interfaces.nsIFilePicker
    fp = Components.classes["@mozilla.org/filepicker;1"].createInstance(nsIFilePicker)
    fp.init(window, "Open File", nsIFilePicker.modeOpen)
    fp.appendFilters(nsIFilePicker.filterText | nsIFilePicker.filterAll)
    res = fp.show()
    if (res == nsIFilePicker.returnOK)
      thefile = fp.file
      data = @read(thefile.path)
      @graficar(data)

  read: (filename) ->
    nsILocalFile = Components.interfaces.nsILocalFile
    file = Components.classes["@mozilla.org/file/local;1"].createInstance(nsILocalFile)
    file.initWithPath(filename)
    if (file.exists() == false)
      alert("File does not exist")
    nsIFileInputStream = Components.interfaces.nsIFileInputStream
    inputStream = Components.classes["@mozilla.org/network/file-input-stream;1"].createInstance(nsIFileInputStream)
    inputStream.init(file,0x01,00004,null)
    nsIScriptableInputStream = Components.interfaces.nsIScriptableInputStream
    sInputStream = Components.classes["@mozilla.org/scriptableinputstream;1"].createInstance(nsIScriptableInputStream)
    sInputStream.init(inputStream)
    output = sInputStream.read(sInputStream.available())
    return output
	
  save: ->
    nsIFilePicker = Components.interfaces.nsIFilePicker
    fp = Components.classes["@mozilla.org/filepicker;1"].createInstance(nsIFilePicker)
    fp.init(window, "Save File", nsIFilePicker.modeSave)
    fp.appendFilters(nsIFilePicker.filterText | nsIFilePicker.filterAll)
    res = fp.show()
    if (res == nsIFilePicker.returnOK) 
      thefile = fp.file
      @write(thefile.path,@xml2string(@doc))

  write: (filename,data) ->
    nsILocalFile = Components.interfaces.nsILocalFile file = Components.classes["@mozilla.org/file/local;1"].createInstance(nsILocalFile)
    nsIFileOutputStream = Components.interfaces.nsIFileOutputStream
    outputStream = Components.classes["@mozilla.org/network/file-output-stream;1"].createInstance(nsIFileOutputStream)
    file.initWithPath(filename)
    outputStream.init(file, 0x04 | 0x08 | 0x20, 0666, 0)
    outputStream.write(data,data.length)
    outputStream.close()

 
  graficar: (data) ->
    parse = new DOMParser()
    @doc = parse.parseFromString(data,"application/xml")
    array = new Array()
    array = d3.select(@doc).selectAll("Bar")[0]
   
    gData = new Array()
    for i in [0..array.length-1]
     field = parseInt(array[i].getAttribute("x"))
     fieldy = parseInt(array[i].getAttribute("y"))
     fieldz = parseInt(array[i].getAttribute("z"))
     gData.push { 
          x: field
          y: fieldy
          z: fieldz }
	
    makeGraph(gData);
        
	 
			 
@file = new File

