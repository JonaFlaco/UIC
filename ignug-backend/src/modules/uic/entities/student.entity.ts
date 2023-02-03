import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProjectPlanEntity, StudentInformationEntity } from '@uic/entities';

@Entity('students', { schema: 'uic' })
export class StudentEntity {
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

  // Relationships

  /*@ManyToOne(() => MeshStudentEntity, (meshStudent) => meshStudent.students)
    @JoinColumn({ name: 'mesh_student_id' })
    meshStudent: MeshStudentEntity[];*/

  // @OneToMany(() => StudentInformationEntity,(studentInformation) => studentInformation.student)
  // studentInformations: StudentInformationEntity;

  @ManyToOne(() => ProjectPlanEntity, (projectPlan) => projectPlan.students)
  @JoinColumn({ name: 'project_plan_id' })
  projectPlan: ProjectPlanEntity;

  // Fields
  @Column('text', {
    name: 'observation',
    comment: 'En el caso de que haya cambios del anteproyecto',
  })
  observation: string;
}
