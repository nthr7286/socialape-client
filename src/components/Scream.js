import React from 'react'
import { Link } from 'react-router-dom'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import Card from '@material-ui/core/Card'
import { makeStyles } from '@material-ui/core/styles'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  card: {
    display: 'flex',
    marginBottom: 20,
  },
  image: {
    minWidth: 200,
  },
  content: {
    padding: 24,
    objectFit: 'cover',
  },
}))


export default props => {
  dayjs.extend(relativeTime)
  const classes = useStyles()
  const { scream: {
    body,
    createdAt,
    userImage,
    userHandle,
    likeCount,
    commentCount,
  } }  = props

  return (
    <Card className={classes.card}>
      <CardMedia
        image={userImage}
        title="Profile Image"
        className={classes.image}
      />
      <CardContent className={classes.content}>
        <Typography
          variant="h5"
          component={Link}
          to={`/users/${userHandle}`}
          color="primary"
          children={userHandle}
        />
        <Typography
          variant="body2"
          color="textSecondary"
          children={
            dayjs(createdAt)
            .fromNow()
          }
        />
        <Typography
          variant="body1"
          children={body}
        />
      </CardContent>
    </Card>
  )
}
