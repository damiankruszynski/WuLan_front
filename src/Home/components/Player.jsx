import React from 'react'
import ReactPlayer from 'react-player';
import consts from '../../consts';
import API_HomeService from '../services/API_HomeService';

 function Player (props) {

    const filePath = props.file.filePath;

    var urlVideo = new URL(consts.getAUTH_API_BASE_URL()+"stream");
    urlVideo.searchParams.set('filePath', filePath);

    const urlSub = new URL(consts.getAUTH_API_BASE_URL()+"stream");
    urlSub.searchParams.set('filePath', props.file.subPath);



    let onStart = false;
    async function getSecoundPlayedFromAPI(e){
        let timeWatched = 0;
        if(!onStart){
            try{
                timeWatched = await API_HomeService.getTimeWatched(filePath);
            }catch(e){
                console.log(e);
                timeWatched = 0;
            }
            e.seekTo(timeWatched,'secounds')
            onStart = true;
        }
    }

    function saveScoundPlayedInAPI(secounds){
        API_HomeService.setTimeWatched(filePath,secounds);
    }


    let timeToSaveInAPI = 0;
    function onProgressHandle(e){
        timeToSaveInAPI++;
        if(timeToSaveInAPI === 6){
            timeToSaveInAPI = 0;
           const seconudPlayed = Math.floor(e.playedSeconds);
            saveScoundPlayedInAPI(seconudPlayed);
        }
    }

    function onSeekHandle(e){
        const seconudPlayed = Math.floor(e);
         saveScoundPlayedInAPI(seconudPlayed);
    }

     return (
        <div>
            <ReactPlayer
                url={urlVideo} 
                controls={true}
                width='100%'
                height='100%'
                onProgress={onProgressHandle}
                onSeek={onSeekHandle}
                onReady={getSecoundPlayedFromAPI}               
                config={{ file: {
                     attributes: {
                            crossOrigin: 'true'
                    },
                    tracks: [ 
                    {kind: 'subtitles', src: urlSub.toString(), label: "Włączone", default: true},
                    ]
                }}}
            />
        </div>
        )

}

export default Player;