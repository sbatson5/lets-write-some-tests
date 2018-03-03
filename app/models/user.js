import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { computed, get, set } from '@ember/object';
import { gte } from '@ember/object/computed';
import { isPresent } from '@ember/utils';

const formatMoney = (attrName) => {
  return computed(attrName, {
    get() {
      let fieldInCents = get(this, attrName);
      if (isPresent(fieldInCents)) {
        return fieldInCents / 100;
      }
    },
    set(_, value) {
      set(this, attrName, (value * 100));
      return value;
    }
  });
};

export default Model.extend({
  firstName: attr('string'),
  lastName: attr('string'),
  dateOfBirth: attr('date'),
  email: attr('string'),
  currentSavingsAmount: attr('number'),
  currentCheckingAmount: attr('number'),
  notes: attr('string'),

  currentSavingsInCents: formatMoney('currentSavingsAmount'),
  currentCheckingInCents: formatMoney('currentCheckingAmount'),

  fullName: computed('firstName', 'lastName', function() {
    return `${get(this, 'firstName')} ${get(this, 'lastName')}`;
  }),

  age: computed('dateOfBirth', function() {
    let birthdate = new Date(get(this, 'dateOfBirth'));
    let ageDate = Date.now() - birthdate.getTime();
    return Math.abs(new Date(ageDate).getUTCFullYear() - 1970);
  }),

  isOverEighteen: gte('age', 18)
});
