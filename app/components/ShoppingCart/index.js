import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import { Grid, Segment, Divider } from 'semantic-ui-react';
import ShoppingItem from 'components/ShoppingItem';

function amount(item) {
  return item.cartQty || 0;
}

function sum(prev, next) {
  return prev + next;
}

export class ShoppingCart extends Component {

  constructor(props) {
    super(props);
    this.renderItem  = this.renderItem.bind(this);
    this.renderTotal = this.renderTotal.bind(this);
  }

  renderItem(item) {
    let itemElement = '';
    if (item.cartQty > 0) {
      itemElement = (
        <ShoppingItem key={item.id} item={item} removeToCart={this.props.removeToCart} />
      );
    }
    return itemElement;
  }

  renderTotal(items) {
    const quantity = items.map((item) => {
      const itemQuantity = amount(item);
      return itemQuantity;
    }).reduce(sum);

    let totalPrice = items.map((item) => {
      const price          = parseFloat(item.price.replace('£', ''));
      const itemTotalPrice = price * amount(item);
      return parseFloat(itemTotalPrice);
    }).reduce(sum);
    totalPrice = totalPrice.toFixed(2);

    return (
      <Grid.Row>
        <Grid.Column
          computer={4}
          tablet={4}
          mobile={8}
        >
          Total
        </Grid.Column>
        <Grid.Column
          computer={3}
          tablet={3}
          mobile={3}
        >
          {quantity}
        </Grid.Column>
        <Grid.Column
          computer={3}
          tablet={2}
          only="computer"
        />
        <Grid.Column
          computer={3}
          tablet={3}
          only="computer"
        >
          £{totalPrice}
        </Grid.Column>
        <Grid.Column
          computer={3}
          tablet={4}
          mobile={5}
        />
      </Grid.Row>
    );
  }

  render() {
    const { items } = this.props;
    return (
      <Segment>
        <Grid>
          <Grid.Row>
            <Grid.Column
              computer={4}
              tablet={4}
              mobile={8}
            />
            <Grid.Column
              computer={3}
              tablet={3}
              mobile={3}
            >
              Quantity
            </Grid.Column>
            <Grid.Column
              computer={3}
              tablet={2}
              only="computer"
            >
              Price
            </Grid.Column>
            <Grid.Column
              computer={3}
              tablet={3}
              only="computer"
            >
              Total Price
            </Grid.Column>
            <Grid.Column
              computer={3}
              tablet={4}
              mobile={5}
            />
          </Grid.Row>
        </Grid>
        { _.map(items, this.renderItem)}
        <Divider />
        <Grid>
          {this.renderTotal(items)}
        </Grid>
      </Segment>
    );
  }
}

ShoppingCart.propTypes = {
  removeToCart : PropTypes.func,
  items        : PropTypes.array,
};

export default ShoppingCart;
