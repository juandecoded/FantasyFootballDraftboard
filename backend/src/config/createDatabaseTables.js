const pool = require('./db');

const createDatabaseTables = async () => {
  try {

    // drop tables

    // await pool.query(`
    //   DROP TABLE IF EXISTS team_rosters, players, teams, roster_settings, drafts CASCADE;`
    // );

    await pool.query(`
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS drafts (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        public_id UUID NOT NULL DEFAULT uuid_generate_v4(),
        draft_name VARCHAR(255) NOT NULL,
        team_count INT NOT NULL,
        pick_timer_length INT NOT NULL
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS roster_settings (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        draft_id UUID NOT NULL,
        position VARCHAR(50) NOT NULL,
        count INT NOT NULL,
        FOREIGN KEY (draft_id) REFERENCES drafts (id) ON DELETE CASCADE
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS teams (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        public_id UUID NOT NULL DEFAULT uuid_generate_v4(),
        draft_id UUID NOT NULL,
        name VARCHAR(255) NOT NULL,
        draft_position INT NOT NULL,
        FOREIGN KEY (draft_id) REFERENCES drafts (id) ON DELETE CASCADE
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS players (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        public_id UUID NOT NULL DEFAULT uuid_generate_v4(),
        first_name VARCHAR(50) NOT NULL,
        last_name VARCHAR(50) NOT NULL,
        college VARCHAR(100),
        position VARCHAR(50) NOT NULL,
        pro_team VARCHAR(50) NOT NULL,
        bye_week INT,
        adp INT,
        rank INT,
        season_point_projection INT,
        status VARCHAR(50) NOT NULL,
        height VARCHAR(10),
        weight VARCHAR(10),
        jersey_number INT,
        age INT,
        draft_status VARCHAR(50),
        fantasy_team UUID,
        FOREIGN KEY (fantasy_team) REFERENCES teams (id) ON DELETE SET NULL,
        UNIQUE (first_name, last_name, pro_team, position)
      );
    `);
    
    await pool.query(`
      CREATE TABLE IF NOT EXISTS team_rosters (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        public_id UUID NOT NULL DEFAULT uuid_generate_v4(),
        team_id UUID NOT NULL,
        position VARCHAR(50) NOT NULL,
        slot INT NOT NULL,
        player_id UUID,       
        FOREIGN KEY (team_id) REFERENCES teams(id),
        FOREIGN KEY (player_id) REFERENCES players(id)
      );`
    );

    await pool.query(`
      CREATE TABLE IF NOT EXISTS draft_picks (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        draft_id UUID NOT NULL,
        team_id UUID NOT NULL,
        player_id UUID NOT NULL,
        pick_number INT NOT NULL,
        round_number INT NOT NULL,
        FOREIGN KEY (draft_id) REFERENCES drafts(id) ON DELETE CASCADE,
        FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE,
        FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE,
        UNIQUE (draft_id, pick_number)
      );`
    );


    console.log('Database tables created successfully');
  } catch (error) {
    console.error('Error creating database tables:', error);
  } finally {
    pool.end();
  }
};

createDatabaseTables();