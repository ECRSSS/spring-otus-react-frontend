import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import MenuBookIcon from '@material-ui/icons/MenuBook';


const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

class BooksLib extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          items: []
        };
      }

    componentDidMount() {
        fetch("http://localhost:8090/api/books")
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                isLoaded: true,
                items: result
              });
              console.log(result);
              
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
      }

    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
          return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
          return <div>Loading...</div>;
        } else {
          return (
            <Container maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={4}>
              {this.state.items.map(book => (
                <Grid item key={book} xs={12} sm={6} md={4}>
                  <Card className="card" spacing={4}>
                    <CardContent>
                        <MenuBookIcon alignmentBaseline = "central"/>
                      <Typography>
                        id: {book.id}
                      </Typography>
                      <Typography gutterBottom variant="h5" component="h2">
                        book title: {book.bookTitle}
                      </Typography>
                      <Typography gutterBottom variant="h5" component="h2">
                        Authors:
                      </Typography>
                      {book.authors.map(author => (
                        <Typography>
                        {author.firstName} {author.lastName}
                      </Typography>
                      ))}
                      <Typography gutterBottom variant="h5" component="h2">
                        Comments:
                      </Typography>
                      {book.comments.map(comment => (
                        <Typography>
                        {comment.commentText}
                      </Typography>
                      ))}
                    </CardContent>
                    <CardActions>
                      <Button size="small" color="primary">
                        Edit
                      </Button>
                      <Button size="small" color="secondary">
                        Delete
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
          );
        }
      }

}
export default BooksLib