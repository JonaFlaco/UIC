import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BeforeInsert,
  BeforeUpdate,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { ProjectEntity, TutorAssignmentEntity, StudentEntity, PlanningEntity, CatalogueEntity } from '@uic/entities';

@Entity('project_plans', { schema: 'uic' })
export class ProjectPlanEntity {
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

  //REVISAR

  // Relationships

  @OneToMany(() => StudentEntity, (student) => student.projectPlan)
  students: StudentEntity[];

  @OneToMany(() => ProjectEntity, (project) => project.projectPlan)
  projects: ProjectEntity[];

  @OneToMany(() => TutorAssignmentEntity, (tutorAssignment) => tutorAssignment.projectPlan)
  tutorAssignments: TutorAssignmentEntity;

  @ManyToOne(() => PlanningEntity, (planning) => planning.projectPlans)
  @JoinColumn({ name: 'planning_id' })
  planning: PlanningEntity;

  @ManyToOne(() => CatalogueEntity, (state) => state.projectPlans)
  @JoinColumn({ name: 'state_id' })
  state: CatalogueEntity;
 

  // Fields
  
  @Column('varchar', {
    name: 'title',
    comment: 'Tema del que tratara el proyecto de titulacion',
  })
  title: string;

  @Column('varchar', {
    name: 'description',
    comment: 'Un pequeño resumen de lo que tratara el proyecto',
  })
  description: string;

  @Column('varchar', {
    name: 'act_code',
    unique: true,
    comment: 'Codigo del acta que se va a redactar',
  })
  actCode: string;

  @Column('timestamp', {
    name: 'approved_at',
    comment: 'Fecha en la que se aprobo el anteproyecto por la junta',
    })
    approvedAt: Date;

  @Column('timestamp', {
    name: 'assigned_at',
    comment: 'Fecha en la que se asigno el tutor a el anteproyecto',
  })
  assignedAt: Date;


   @Column('timestamp', {
    name: 'tutor_approved_at',
    comment: 'fecha de aprobacion del Ante proyecto por el tutor',
  })
  tutorApprovedAt: Date;

  @Column('varchar', {
    name: 'observation',
    comment: 'El tutor escribirá un comentario de ser necesario',
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
