function matchYoutubeUrl(url) {
    var p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    if(url.match(p)){
        return url.match(p)[1];
    }
    return false;
}


$(() => {
  $('#download').on('click', function(event) {
    const text = $('#text-input').val();
    const fs = require('fs');
    const {dialog} = require("electron").remote;
    const ytdl = require('ytdl-core');
    if (matchYoutubeUrl(text)) {
      var savePath = dialog.showSaveDialog({filters: [{
        name: 'MP4',
        extensions: ['mp4']
      }]});
      if (savePath){
        ytdl(text, { filter: (format) => format.container === 'mp4' }).pipe(fs.createWriteStream(savePath));
      }
    } else {
      dialog.showMessageBox({ message: "Invalid YouTube URL- make sure you have entered a valid link to a YouTube video and try again.",
        buttons: ["OK"] });
    }
  $('#text-input').focus(); // focus input box
})});
