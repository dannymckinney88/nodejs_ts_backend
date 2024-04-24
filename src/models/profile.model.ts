import {
    Table,
    Column,
    Model,
    PrimaryKey,
    AutoIncrement,
    ForeignKey,
    DataType,
    CreatedAt,
    UpdatedAt,
  } from 'sequelize-typescript';
  import  User  from './user.model'; // Make sure to define this model
  
  interface ProfileCreationAttributes {
    user_id: number;
    first_name: string;
    last_name: string;
    birthdate: Date;
    gender: string;
    height: number;
    weight: number;
    activity_level: string;
  }

  @Table ({ tableName: 'profiles' })
  export default class Profile extends Model<Profile, ProfileCreationAttributes> {
    @PrimaryKey
    @AutoIncrement
    @Column
    profile_id!: number;
  
    @ForeignKey(() => User)
    @Column({ field: 'user_id' }) // Match the actual database column name
    user_id!: number;
  
    @Column
    first_name!: string;
  
    @Column
    last_name?: string;
  
    @Column(DataType.DATE)
    birthdate?: Date;
  
    @Column
    gender?: string;
  
    @Column(DataType.INTEGER)
    height?: number;
  
    @Column(DataType.DECIMAL(5, 2))
    weight?: number;
  
    @Column
    activity_level?: string;

    @CreatedAt
    @Column
    created_at!: Date;
  
    @UpdatedAt
    @Column
    updated_at!: Date;
  }
  