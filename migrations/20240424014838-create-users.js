'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('profiles', {
      profile_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'users', // name of the created table
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      last_name: {
        type: Sequelize.STRING
      },
      birthdate: {
        type: Sequelize.DATEONLY
      },
      gender: {
        type: Sequelize.STRING
      },
      height: {
        type: Sequelize.INTEGER
      },
      weight: {
        type: Sequelize.DECIMAL(5, 2)
      },
      activity_level: {
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Adding the trigger for the updated_at column to be updated on each row update.
    'use strict';

    module.exports = {
      up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('profiles', {
          profile_id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
          },
          user_id: {
            allowNull: false,
            type: Sequelize.INTEGER,
            references: {
              model: 'users', // name of the created table
              key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
          },
          first_name: {
            type: Sequelize.STRING,
            allowNull: false
          },
          last_name: {
            type: Sequelize.STRING
          },
          birthdate: {
            type: Sequelize.DATEONLY
          },
          gender: {
            type: Sequelize.STRING
          },
          height: {
            type: Sequelize.INTEGER
          },
          weight: {
            type: Sequelize.DECIMAL(5, 2)
          },
          activity_level: {
            type: Sequelize.STRING
          },
          created_at: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
          },
          updated_at: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
          }
        });
    
        // Adding the trigger for the updated_at column to be updated on each row update.
        await queryInterface.sequelize.query(`
          CREATE OR REPLACE FUNCTION update_updated_at_column()
          RETURNS TRIGGER AS $$
          BEGIN
            NEW.updated_at = NOW();
            RETURN NEW;
          END;
          $$ LANGUAGE plpgsql;
        `);
    
        await queryInterface.sequelize.query(`
          CREATE TRIGGER update_profile_updated_at BEFORE UPDATE
          ON profiles FOR EACH ROW
          EXECUTE FUNCTION update_updated_at_column();
        `);
      },
    
      down: async (queryInterface, Sequelize) => {
        // Remove the trigger
        await queryInterface.sequelize.query('DROP TRIGGER IF EXISTS update_profile_updated_at ON profiles;');
        await queryInterface.sequelize.query('DROP FUNCTION IF EXISTS update_updated_at_column();');
    
        // Drop the table
        await queryInterface.dropTable('profiles');
      }
    };
    
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the trigger
    await queryInterface.sequelize.query('DROP TRIGGER IF EXISTS update_profile_updated_at ON profiles;');
    await queryInterface.sequelize.query('DROP FUNCTION IF EXISTS update_updated_at_column();');

    // Drop the table
    await queryInterface.dropTable('profiles');
  }
};
