import React, { Component } from 'react';
import TableHead from './tableHead';
import TableBody from "./tableBody";
import { getCourses } from './services/CourseService';
class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: getCourses(),
            //toggle: false,
            query: ""
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }
    handleClick() {
        const toggle = !this.state.toggle;
        this.setState({ toggle }) //this.state.toggle = toggle is incorrect
    }

    handleDelete = course => {
        const courses= [... this.state.courses];
        const newcourses = courses.filter(p => p.id !== course.id);
        this.setState({courses: newcourses});
    }

    handleSearch = event => {
        this.setState({ query: event.target.value });
    }

    handleLike = course => {
        const courses= [... this.state.courses];
        const index = courses.indexOf(course);
        courses[index].liked = !courses[index].liked;
        this.setState({courses});
    }

    filtercoursesByName= ()=>{
        let courses = [... this.state.courses];
        if(this.state.query) {
            const filtered = courses.filter(p=>
                p.courseName.toLowerCase().startsWith(this.state.query.toLowerCase())
            );
            courses = filtered;
        }
        return courses;
    }

    render() {
        const courses = this.filtercoursesByName();
        return (
            <React.Fragment>
                <table className="table">
                    <TableHead/>
                    <TableBody
                    courses={courses}
                    onDelete={this.handleDelete}
                    onLike={this.handleLike}/>
                </table>
            </React.Fragment>
        );
    }
}
 
export default Table;