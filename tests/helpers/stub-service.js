import Service from '@ember/service';
import { getContext } from '@ember/test-helpers';

let stubbedService = (name, hash = {}) => {
  let stubbedService = Service.extend(hash);

  let { owner } = getContext();
  owner.register(`service:${name}`, stubbedService)
};

export default stubbedService;
