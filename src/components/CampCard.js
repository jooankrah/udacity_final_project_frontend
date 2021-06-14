import React from "react";
import { Card, Typography, Col, Button } from "antd";
import { Link } from "@reach/router";

const { Meta } = Card;
const { Paragraph } = Typography;

export const CampCard = (props) => {
  return (
    <>
      <Col className="gutter-row" xs={32} sm={32} md={16} lg={6} xl={6}>
        <Card
          hoverable
          // style={{ width: 300 }}
          cover={<img alt="cover" src={props.image} style={{ height: 200 }} />}
          actions={[
            <Link to={props.url}>
              <Button type="primary" style={{ width: "90%" }} block>
                View
              </Button>
            </Link>,
          ]}
        >
          <Meta
            title={`${props.title}  -  GH¢ ${props.price}`}
            description={
              <Paragraph
                ellipsis={{ rows: 2, expandable: true, symbol: "more" }}
              >
                {props.description}
              </Paragraph>
            }
          />
        </Card>
      </Col>
    </>
  );
};
