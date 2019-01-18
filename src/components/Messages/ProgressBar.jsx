import React from 'react'
import { Progress } from '../../../node_modules/semantic-ui-react';

const ProgressBar = ({uploadState,percentuploaded}) => {
  return (
    uploadState==='uploading' && (
        <Progress className ='progress_bar' indicating percent={percentuploaded} progress size='medium' inverted/>
    )
  )
}

export default ProgressBar
