import{ CatalogueEntity, ProjectEntity, ProjectPlanEntity }from '@uic/entities'
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

@Entity('tutor_assignments', { schema: 'uic' })
export class TutorAssignmentEntity {
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

  //Relationship

    @ManyToOne(() => ProjectEntity, (project) => project.tutorAssignments)
    @JoinColumn({ name: 'project_id'})
    project: ProjectEntity;

    @ManyToOne(() => CatalogueEntity, (type) => type.tutorAssignments)
    @JoinColumn({ name: 'type_id' })
    type: CatalogueEntity;

    @ManyToOne(() => ProjectPlanEntity, (projectPlan) => projectPlan.tutorAssignments)
    @JoinColumn({name:'project_plan_id'})
    projectPlan: ProjectPlanEntity;

    // @ManyToOne(() => TutorShipEntity, (tutor) => tutor.tutorAssignments)
    // @JoinColumn({ name: 'tutor_id' })
    // tutor: TeacherEntity;

  //Fields

  @Column('text', {
    name: 'observation',
    comment: 'El tutor asignado escribira una observacion de ser necesario.',
  })
  observation: string;

  @BeforeInsert()
  @BeforeUpdate()
  setObservation() {
    if (!this.observation) {
      return;
    }
  this.observation= this.observation.toLowerCase().trim()
  }

}
