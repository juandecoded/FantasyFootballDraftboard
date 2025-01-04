const Joi = require('joi');

const validateFinalDraft = (draft) => {
  const schema = Joi.object({
    draftName: Joi.string().required(),
    teamCount: Joi.number().integer().required(),
    pickTimerLength: Joi.number().integer().required(),
    rosterSettings: Joi.object({
      positions: Joi.object().pattern(Joi.string(), Joi.number().integer()).required(),
      totalRosterSpots: Joi.number().integer().required(),
    }).required(),
    // draftStatus: Joi.string().required(),
    currentlyDrafting: Joi.object({
      teamId: Joi.string().allow(null),
      round: Joi.number().integer().required(),
      pick: Joi.number().integer().required(),
      overallPickNumber: Joi.number().integer().required(),
    }).required(),
    draftOrder: Joi.array().items(Joi.string().uuid()).required(),
    results: Joi.object({
      rounds: Joi.object().pattern(
        Joi.string(),
        Joi.object().pattern(Joi.string(), Joi.object())
      ).required(),
    }).required(),
    teams: Joi.array().items(
      Joi.object({
        teamName: Joi.string().required(),
        draftPosition: Joi.number().integer().required(),
      })
    ).required(),
  });

  return schema.validate(draft);
};

const validateNewDraft = (draft) => {
  const schema = Joi.object({
    draftName: Joi.string().required(),
    teamCount: Joi.number().integer().required(),
    pickTimerLength: Joi.number().integer().required(),
    rosterSettings: Joi.object({
      positions: Joi.object().pattern(Joi.string(), Joi.number().integer()).required(),
      totalRosterSpots: Joi.number().integer().required(),
    }).required(),
    teams: Joi.array().items(
      Joi.object({
        teamName: Joi.string().required(),
        draftPosition: Joi.number().integer().required(),
      })
    ).required(),
  });

  return schema.validate(draft);
};

const validateRosterSettings = (rosterSettings) => {
  const schema = Joi.object({
    positions: Joi.object().pattern(Joi.string(), Joi.number().integer()).required(),
    totalRosterSpots: Joi.number().integer().required(),
  });

  return schema.validate(rosterSettings);
};

module.exports = {
  validateFinalDraft,
  validateNewDraft,
  validateRosterSettings,
};