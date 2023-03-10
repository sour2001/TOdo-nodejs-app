const express=require('express');
const path=require('path');
const port=8000;
const db=require('./config/mongoose');
const Todo=require('./model/todo');
const app=express();


app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static('assets'));
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));



app.get('/',function(req,res){
    Todo.find({}).then(function(todos){
        return res.render('home',{
            title:"My To Do App",
            todo_list:todos
        });
    }).catch(function(err){
        console.log("Error in fetching todos from db");
        return;
    });
});

app.post('/create-todo',function(req,res){
   Todo.create({
         description:req.body.description,
            category:req.body.category,
            date:req.body.date
    }).then(function(newTodo){
        console.log("********",newTodo);
        return res.redirect('back');
    }).catch(function(err){
        console.log("Error in creating a todo");
        return;
    });
});
 
app.get('/delete-todo',function(req,res){
    let id=req.query.id;
    Todo.findByIdAndDelete(id).then(function(){ 
        return res.redirect('back');
    }).catch(function(err){
        console.log("Error in deleting an object from database");
        return;
    });
});

app.listen(port,function(err){ 
    if(err){
        console.log("Error in running the server",err);
    }
    console.log("Yup! My express server is running on port:",port);
}
);
