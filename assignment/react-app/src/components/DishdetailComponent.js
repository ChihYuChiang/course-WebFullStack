import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
  CardTitle } from 'reactstrap';

class DishDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    renderDish(dish) {
        return(
            <Card>
                <CardImg top src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        );
    }

    renderComments(comments) {
        if(comments != null) {
            const content = comments.map((comment) => {
                let date = new Date(comment.date);
                let options = { year: 'numeric', month: 'short', day: 'numeric' };
                return (
                    <li key={comment.id}>
                        <p>{comment.comment}</p>
                        <p>-- {comment.author}, {date.toLocaleDateString('en-US', options)}</p>
                    </li>
                );
            });
    
            return(
                <div>
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                        {content}
                    </ul>
                </div>
            );
        }
        else return(<div></div>);
    }

    render() {
        if(this.props.selectedDish != null)
            return(
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        {this.renderDish(this.props.selectedDish)}
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        {this.renderComments(this.props.selectedDish.comments)}
                    </div>
                </div>
            );
        else return(<div></div>);
    }
}

export default DishDetail;