import { Table, Column, Model, PrimaryKey, AutoIncrement, Unique, CreatedAt, UpdatedAt } from 'sequelize-typescript';

// Define an interface for creation attributes
interface UserCreationAttributes {
  email: string;
  password_hash: string;
}

@Table ({ tableName: 'users' })
export default class User extends Model<User, UserCreationAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @Unique
  @Column
  email!: string;

  @Column
  password_hash!: string;

  @CreatedAt
  @Column
  created_at!: Date;

  @UpdatedAt
  @Column
  updated_at!: Date;
}

