import React, { Component } from 'react';
import TableHead from './tableHead';
import TableBody from "./tableBody";
import { getCourses } from './services/CourseService';
import { useEffect } from 'react';
function Table() {
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