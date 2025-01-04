const Joi = require('joi');

const validateTeam = (team) => {
  const schema = Joi.object({
    id: Joi.string().uuid().required(),
    publicId: Joi.string().uuid().required(),
    draftId: Joi.string().uuid().required(),
    teamName: Joi.string().required(),
    draftPosition: Joi.number().integer().required(),
    roster: Joi.object({
      qb: Joi.array().items(Joi.object()).required(),
      rb: Joi.array().items(Joi.object()).required(),
      wr: Joi.array().items(Joi.object()).required(),
      te: Joi.array().items(Joi.object()).required(),
      flex: Joi.array().items(Joi.object()).required(),
      k: Joi.array().items(Joi.object()).required(),
      def: Joi.array().items(Joi.object()).required(),
      bench: Joi.array().items(Joi.object()).required(),
    }).required(),
  });

  return schema.validate(team);
};

const validateRoster = (roster) => {
  const schema = Joi.object({
    teamId: Joi.string().uuid().required(),
    position: Joi.string().required(),
    slot: Joi.number().integer().required(),
    playerId: Joi.string().uuid().required(),
  });

  return schema.validate(roster);
};


module.exports = {
  validateRoster,
  validateTeam,
};