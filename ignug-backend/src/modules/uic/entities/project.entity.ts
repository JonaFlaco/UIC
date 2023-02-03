import { EnrollmentEntity, ProjectPlanEntity, TutorAssignmentEntity } from '@uic/entities';
import {
  BeforeInsert,
  BeforeUpdate,
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

@Entity('projects', { schema: 'uic' })
export class ProjectEntity {
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

  @OneToMany(() => TutorAssignmentEntity, (tutorAssignment) => tutorAssignment.project)
  tutorAssignments: TutorAssignmentEntity;

  @ManyToOne(() =>  EnrollmentEntity, (enrollment) => enrollment.projects)
  @JoinColumn({ name: 'enrollment_id' })
  enrollment: EnrollmentEntity;
  
  @ManyToOne(() =>  ProjectPlanEntity, (projectPlan) => projectPlan.projects)
  @JoinColumn({ name: 'project_plan_id' })
  projectPlan: ProjectPlanEntity;


  // Fields
  @Column('varchar', {
    name: 'title',
    comment: 'El titulo del proyecto',
  })
  title: string;

  @Column('boolean', {
    name: 'approved',
    comment: 'True= aprobado , False= reprobado',
  })
  approved: boolean;

  @Column('varchar', {
    name: 'description',
    comment: 'Descripcion de lo que va a tratar el proyecto',
  })
  description: string;

  @Column('integer', {
    name: 'score',
    comment: 'Puntaje del proyecto',
  })
  score: number;

  @Column('text', {
    name: 'observation',
    comment: 'Observacion del proyecto  ',
  })
  observation: string;

  @BeforeInsert()
  @BeforeUpdate()
  setTitle() {
    if (!this.title) {
      return;
    }
  this.title= this.title.toUpperCase().trim()
  }
}
