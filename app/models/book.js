import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  author: attr('string'),
  genre: attr('string'),
  title: attr('string'),
  price: attr('dollar-cents'),
  description: attr('string')
});
