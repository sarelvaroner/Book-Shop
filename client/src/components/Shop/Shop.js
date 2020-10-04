import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import EditIcon from '@material-ui/icons/Edit';
import Typography from '@material-ui/core/Typography';
import SearchBar from "material-ui-search-bar";
import CircularProgress from '@material-ui/core/CircularProgress';
import { getBooks, editBook, createBook, buyBook, deleteBook, getLastBooks } from '../../services/booksService';
import UserContext from '../../UserContext';
import Pagination from '@material-ui/lab/Pagination';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField } from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import DeleteIcon from '@material-ui/icons/Delete';
import DialogContentText from '@material-ui/core/DialogContentText';


const useStyles = makeStyles((theme) => ({

  hero: {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1558981852-426c6c22a060?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80')`,
    height: "200px",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    fontSize: "4rem",
    [theme.breakpoints.down("sm")]: {
      height: 300,
      fontSize: "3em"
    }
  },
  feedContainer: {
    paddingTop: theme.spacing(3)
  },
  card: {
    maxWidth: "100%",
  },
  media: {
    height: 400
  },
  cardActions: {
    display: "flex",
    margin: "0 10px",
    justifyContent: "space-between"
  },
  author: {
    display: "flex"
  },
}));

export default function Shop() {
  const [user] = useContext(UserContext);
  const [search, setSearch] = useState('')
  const [skip, setSkip] = useState(0)
  const [limit, setLimit] = useState(15)
  const [loading, setLoading] = useState(true)
  const [books, setBooks] = useState([])
  const [open, setOpen] = React.useState(false);
  const [bookName, setBookName] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [author, setAuthor] = React.useState('');
  const [publisher, setpublisher] = React.useState('');
  const [currentBook, setCurrentBook] = React.useState(null);
  const [dialogHeader, setDialogHeader] = React.useState('');
  const [isDelete, setIsDelete] = React.useState(false);
  const [isBuying, setIsBuying] = React.useState(false);
  const [lastBook, setLastBook] = React.useState('');
  const classes = useStyles();


  const fetchBooks = async () => {
    try {
      setLoading(true)
      const { books } = await getBooks(user.token, search, skip, limit)
      setBooks(books)
      setLoading(false)
    }
    catch (err) {
      alert(err)
    }
  }


  useEffect(() => {
    try {
      const getBook = async () => {
        const result = await getLastBooks(user.token)
        setLastBook(result)
      }
      getBook()
    }
    catch (err) {
      setLoading(false)
    }
  }, [])


  useEffect(() => {
    try {
      fetchBooks()
    }
    catch (err) {
      setLoading(false)
    }
  }, [search, skip, limit, user.token])


  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const bookNameHandler = (val) => setBookName(val);
  const priceHandler = (val) => setPrice(val);
  const authorHandler = (val) => setAuthor(val);
  const publisherHandler = (val) => setpublisher(val);


  const buyingABook = (val) => {
    setCurrentBook(val)
    setIsBuying(true)
    setDialogHeader(`buying book: ${val.name}`)
    handleClickOpen()
  }


  const onSubmitBuying = async () => {
    try {
      const { token } = user
      await buyBook(token, currentBook._id)
      fetchBooks()
      handleClose()
      setIsBuying(false)
      setLastBook(getLastBooks(token))
    }
    catch (err) {
      console.log(err)
      alert('there is a problem please try again')
      handleClose()
    }
  }


  const createBookHandler = (val) => {
    setCurrentBook(null)
    setDialogHeader('add new book')
    handleClickOpen()
  }


  const onEditBook = (val) => {
    setCurrentBook(val)
    setBookName(val.name);
    setPrice(val.price);
    setAuthor(`${val.author.firstName} ${val.author.lastName}`);
    setpublisher(val.publisher.name)
    setDialogHeader('edit book')
    handleClickOpen()
  }


  const onSubmitSave = async () => {
    try {
      if (!bookName) return
      const { token } = user
      if (currentBook) {
        await editBook(token, currentBook._id, bookName, price, author, publisher)
      }
      else {
        await createBook(token, bookName, price, author, publisher)
      }
      setBookName('');
      setPrice('');
      setAuthor('');
      setpublisher('')
      fetchBooks()
      handleClose()
    }
    catch (err) {
      console.log(err)
      alert('there is a problem please try again')
      handleClose()
    }
  }


  const onDeleteBook = (val) => {
    setCurrentBook(val)
    setIsDelete(true)
    setDialogHeader('delete book')
    handleClickOpen()
  }


  const onSubmitDelete = async () => {
    try {
      const { token } = user
      await deleteBook(token, currentBook._id)
      fetchBooks()
      handleClose()
      setIsDelete(false)

    }
    catch (err) {
      console.log(err)
      alert('there is a problem please try again')
      handleClose()
    }
  }



  return (
    <>
      <Box className={classes.hero}>
        <Box>Book Shop</Box>
      </Box>
      <Container maxWidth="lg" className={classes.feedContainer}>
        <Grid
          container spacing={3}
          alignItems="center"
          justify="center"
          style={{ minHeight: '50vh' }}
        >
          <Grid item xs={10} sm={10} md={10} key={'key'}>
            <SearchBar
              value={search}
              onChange={(newValue) => setSearch(newValue)}
            />
          </Grid>
          {
            <Grid item xs={2} sm={2} md={2} key={'key8'}>
              {
                user.isAdmin ?
                  <Button variant="outlined" color="default" onClick={createBookHandler}> create new book</Button> :
                  <Typography variant="subtitle2" component="p">
                    {`the last book you bought is: ${lastBook.name}`}
                  </Typography>
              }
            </Grid>
          }
          {
            loading ?
              <Grid item key={'key2'}>
                <CircularProgress />
              </Grid>
              :
              books.length === 0 ? <h1>there is no books to buy</h1> : books.map((book) => {
                return (
                  <Grid item xs={12} sm={6} md={4} key={book._id}>
                    <Card className={classes.card}>
                      <CardActionArea>
                        <CardActions className={classes.cardActions}>
                          <Box className={classes.author}>
                            <Box ml={2}>
                              <Typography variant="subtitle2" component="p">
                                {`${book.price} $`}
                              </Typography>
                              <Typography variant="subtitle2" color="textSecondary" component="p">
                                {book.author && `author: ${book.author.firstName} ${book.author.lastName || ''}`}
                              </Typography>
                            </Box>
                          </Box>
                          {
                            user.isAdmin ?
                              <Box>
                                <EditIcon onClick={() => onEditBook(book)} />
                                <DeleteIcon onClick={() => onDeleteBook(book)} />
                              </Box> :
                              <Box>
                                <AddShoppingCartIcon onClick={() => buyingABook(book)} />
                              </Box>
                          }
                        </CardActions>
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="h2">
                            {`book name: ${book.name}`}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                )
              })}
        </Grid>
      </Container>
      <Box width="100%"><Pagination count={5} color="primary" onChange={(e, page) => setSkip(limit * (page - 1))} /></Box>
      {
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="draggable-dialog-title"
        >
          <DialogTitle id="draggable-dialog-title">{dialogHeader}</DialogTitle>
          <DialogContent>
            {
              isDelete || isBuying ?
                <DialogContentText>
                  {`are you want to ${isBuying ? 'buy' : 'delete'} this book?`}
                </DialogContentText> :
                <form className={classes.form} noValidate >
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="the name of the book"
                    name="book"
                    autoComplete="book"
                    autoFocus
                    value={bookName}
                    onChange={(e) => bookNameHandler(e.target.value)}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="price"
                    label="price"
                    id="price"
                    autoComplete="price"
                    value={price}
                    onChange={(e) => priceHandler(e.target.value)}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="author"
                    label="author"
                    id="author"
                    autoComplete="author"
                    value={author}
                    onChange={(e) => authorHandler(e.target.value)}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="publisher"
                    label="publisher"
                    id="publisher"
                    autoComplete="publisher"
                    value={publisher}
                    onChange={(e) => publisherHandler(e.target.value)}
                  />
                  <Grid container>
                    <Grid item>
                    </Grid>
                  </Grid>
                </form>
            }
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose} color="primary">
              Cancel
          </Button>
            {
              !isDelete ?
                <Button onClick={() => {
                  if (isBuying) {
                    onSubmitBuying()
                  }
                  else {
                    onSubmitSave()
                  }
                }} color="primary">
                  {!isBuying ? 'svae' : 'confirm buing'}
                </Button>
                :
                <Button onClick={onSubmitDelete} color="primary">
                  delete
                </Button>
            }
          </DialogActions>
        </Dialog>}
    </>
  )
}


