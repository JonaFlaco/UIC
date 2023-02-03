import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { StudentEntity } from './student.entity';

@Entity('student_informatios', { schema: 'uic' })
export class StudentInformationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    nullable: true,
  })
  deletedAt: Date;

  // @ManyToOne(() => StudentEntity, (student) => student.studentInformations)
  // @JoinColumn({ name: 'student_id' })
  // student: StudentEntity;

  //Fields
  @Column('text', {
    name: 'company_work',
    comment: 'Empresa donde labora',
  })
  companyWork: string;

  @Column('text', {
    name: 'company_area',
    comment: 'Area de la empresa donde labora',
  })
  companyArea: string;

  @Column('text', {
    name: 'company_position',
    comment: 'Cargo de la empresa donde labora',
  })
  companyPosition: string;

  @Column('text', {
    name: 'relation_laboral_carrer',
    comment: 'Relacion laboral con la empresa',
  })
  relationLaboralCarrer: string;
}
