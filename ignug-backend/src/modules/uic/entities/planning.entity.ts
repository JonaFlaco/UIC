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
import { EventEntity } from './event.entity';
import { EnrollmentEntity, ModalityEntity, ProjectPlanEntity } from '@uic/entities';

@Entity('plannings', { schema: 'uic' })
export class PlanningEntity {
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
  //@ManyToOne(() => CareerEntity, (career) => career.planning)
  //@JoinColumn({ name: 'career_id' })
  //career: CareerEntity;
  //careerId: PlanningEntity;

  @ManyToOne(() => ModalityEntity, (nameModality) => nameModality.name)
  @JoinColumn({ name: 'modality_id' })
  nameModality: PlanningEntity;

  @OneToMany(() => EventEntity, (event) => event.planning)
  events: EventEntity[];

  @OneToMany(() => EnrollmentEntity, (enrollment) => enrollment.planning)
  enrollments: EnrollmentEntity[];
  
  @OneToMany(() => ProjectPlanEntity, (projectPlan) => projectPlan.planning)
  projectPlans: ProjectPlanEntity[];
  // Fields
  @Column('text', {
    name: 'description',
    //unique: true,
    comment: 'Esta convocatoria es solo para egresados',
  })
  description: string;

  @Column('timestamp', {
    name: 'end_date',
    comment: 'Fecha para la finalización de la convocatoria',
  })
  endDate: Date;

  @Column('varchar', {
    name: 'name',
    //unique: true,
    comment: 'Nombre de la Convocatoria',
  })
  name: string;

  @Column('timestamp', {
    name: 'start_date',
    comment: 'Fecha de inico de la convocatoria',
  })
  startDate: Date;

  @BeforeInsert()
  @BeforeUpdate()
  setname() {
    if (!this.name) {
      return;
    }
  this.name= this.name.toUpperCase().trim()
  }
}
