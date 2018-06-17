'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ObjectController = require('../controllers/ObjectController');

var actions = _interopRequireWildcard(_ObjectController);

var _express = require('express');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var router = (0, _express.Router)();

router.get('/', actions.all);
router.get('/:key', actions.get);
router.put('/:key', actions.set);
router.delete('/:key', actions.deleteOne);
router.delete('/flush/all', actions.deleteAll);

exports.default = router;
//# sourceMappingURL=objects.js.map