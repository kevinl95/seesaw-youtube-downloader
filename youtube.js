$(() => {
  $('#text-input').bind('input propertychange', function() {
    const text = this.value;
    const fs = require('fs');
    const {dialog} = require("electron").remote;
    const ytdl = require('ytdl-core');
    var savePath = dialog.showSaveDialog({filters: [{
      name: 'MP4',
      extensions: ['mp4']
    }]});
    ytdl(text, { filter: (format) => format.container === 'mp4' }).pipe(fs.createWriteStream(savePath));

  $('#text-input').focus(); // focus input box
})});
