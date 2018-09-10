import React from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle } from 'reactstrap';

    function RenderDish({dish}) {
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

    function RenderComments({comments}) {
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

    const DishDetail = (props) => {
        if(props.dish != null)
            return(
                <div class="container">
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <RenderDish dish={props.dish} />
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            <RenderComments  comments={props.dish.comments} />
                        </div>
                    </div>
                </div>
            );
        else return(<div></div>);
    }

export default DishDetail;