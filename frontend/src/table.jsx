import React, { Component } from 'react';
import TableHead from './tableHead';
import TableBody from "./tableBody";
import { getCourses } from './services/CourseService';
import { useEffect } from 'react';
function Table() {
    // const user = localStorage.getItem("user");
    // console.log(user);
    // const { user } = location.state;
    // this.handleClick = this.handleClick.bind(this);
    // this.handleSearch = this.handleSearch.bind(this);
    function handleClick() {
        console.log("clicked");
        // const toggle = !this.state.toggle;
        // this.setState({ toggle }) //this.state.toggle = toggle is incorrect
    }

    const handleDelete = course => {
        const courses = [... this.state.courses];
        const newcourses = courses.filter(p => p.id !== course.id);
        this.setState({ courses: newcourses });
    }

    const handleSearch = event => {
        this.setState({ query: event.target.value });
    }

    const handleLike = course => {
        const courses = [... this.state.courses];
        const index = courses.indexOf(course);
        courses[index].liked = !courses[index].liked;
        this.setState({ courses });
    }

    const filtercoursesByName = () => {
        let courses = [... this.state.courses];
        if (this.state.query) {
            const filtered = courses.filter(p =>
                p.courseName.toLowerCase().startsWith(this.state.query.toLowerCase())
            );
            courses = filtered;
        }
        return courses;
    }

    return (
        <React.Fragment>
            <table className="table">
                <TableHead />
                <TableBody/>
            </table>
        </React.Fragment>
    );
}

export default Table;